import { GET, POST } from "@/app/(landing)/api/client_logo/route";

// 🧱 Mock all imported modules
jest.mock("@/lib/data/client_logo", () => ({
  getAllByFilter: jest.fn(),
  countAll: jest.fn(),
  createData: jest.fn(),
}));
jest.mock("@/lib/generate_random", () => jest.fn(() => "random123"));
jest.mock("@/lib/cloudinary", () => ({
  uploader: {
    upload_stream: jest.fn(),
  },
}));
jest.mock("@/lib/cloudinary_api_response", () => jest.fn(() => true));

// 🧩 Import mocks after jest.mock
import { getAllByFilter, countAll, createData } from "@/lib/data/client_logo";
import generateRandomId from "@/lib/generate_random";
import cloudinary from "@/lib/cloudinary";
import isUploadApiResponse from "@/lib/cloudinary_api_response";

describe("API /api/client_logo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // 🧪 GET Tests
  // =========================
  describe("GET", () => {
    it("should return paginated items with Content-Range header", async () => {
      (getAllByFilter as jest.Mock).mockResolvedValue([
        { id: 1, name: "Logo A" },
        { id: 2, name: "Logo B" },
      ]);
      (countAll as jest.Mock).mockResolvedValue(10);

      const req = new Request("http://localhost/api/client_logo?_page=1&_limit=2");

      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual([
        { id: 1, name: "Logo A" },
        { id: 2, name: "Logo B" },
      ]);

      // Check Content-Range header
      expect(res.headers.get("Content-Range")).toBe("services 1-2/10");

      // Verify DB calls
      expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 2 });
      expect(countAll).toHaveBeenCalled();
    });
  });

  // =========================
  // 🧪 POST Tests
  // =========================
  describe("POST", () => {
    it("should return 400 if no image is provided", async () => {
      const req = new Request("http://localhost/api/client_logo", {
        method: "POST",
        body: JSON.stringify({ name: "Test Client" }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("No image uploaded");
    });

    it("should upload image, create record, and return data", async () => {
      // Mock Cloudinary upload_stream
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({
          end: () =>
            callback(null, { secure_url: "https://cloudinary.com/test.jpg" }),
        })
      );

      (createData as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Test Client",
      });

      const req = new Request("http://localhost/api/client_logo", {
        method: "POST",
        body: JSON.stringify({
          name: "Test Client",
          image: { src: "data:image/png;base64,aGVsbG8=" },
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({
        id: 1,
        name: "Test Client",
        image: {
          src: "https://cloudinary.com/test.jpg",
          title: "Test Client",
        },
      });

      expect(createData).toHaveBeenCalledWith({
        name: "Test Client",
        image: "https://cloudinary.com/test.jpg",
      });
      expect(isUploadApiResponse).toHaveBeenCalled();
    });

    it("should return 500 if Cloudinary returns invalid response", async () => {
      // Mock Cloudinary upload_stream success
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({
          end: () => callback(null, { secure_url: "invalid" }),
        })
      );

      // Force invalid upload response
      (isUploadApiResponse as unknown as jest.Mock).mockReturnValue(false);

      const req = new Request("http://localhost/api/client_logo", {
        method: "POST",
        body: JSON.stringify({
          name: "Bad Upload",
          image: { src: "data:image/png;base64,aGVsbG8=" },
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Invalid upload response");
    });
  });
});
