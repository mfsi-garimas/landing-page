/**
 * @jest-environment node
 */

import { GET, POST } from "@/app/(landing)/api/success_stories/route";
import { NextResponse } from "next/server";
import { getAllByFilter, countAll, createData } from "@/lib/data/success_stories";
import cloudinary from "@/lib/cloudinary";
import slugify from "slugify";
import isUploadApiResponse from "@/lib/cloudinary_api_response";

// -----------------------------
// 🔧 Mock dependencies
// -----------------------------
jest.mock("@/lib/data/success_stories", () => ({
  getAllByFilter: jest.fn(),
  countAll: jest.fn(),
  createData: jest.fn(),
}));

jest.mock("@/lib/cloudinary", () => ({
  uploader: { upload_stream: jest.fn() },
}));

jest.mock("@/lib/generate_random", () => jest.fn(() => "random123"));
jest.mock("@/lib/cloudinary_api_response", () => jest.fn(() => true));
jest.mock("slugify", () => jest.fn((str: string, _opts?: any) => str.toLowerCase()));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status ?? 200,
      json: async () => data,
      headers: { set: jest.fn() },
    })),
  },
}));

// -----------------------------
// ✅ Test suite
// -----------------------------
describe("API /api/success_stories", () => {
  const jsonMock = NextResponse.json as jest.Mock;
  const uploadMock = cloudinary.uploader.upload_stream as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------
  // GET Tests
  // --------------------------
  describe("GET", () => {
    it("should return paginated success stories with headers", async () => {
      const mockItems = [
        { id: 1, title: "Story 1" },
        { id: 2, title: "Story 2" },
      ];

      (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
      (countAll as jest.Mock).mockResolvedValue(20);

      const req = new Request("http://localhost/api/success_stories?_page=1&_limit=2");
      const res = await GET(req);
      const data = await res.json();

      expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 2 });
      expect(countAll).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(mockItems);

      const mockResponse = jsonMock.mock.results.find(r => r.value.headers);
      expect(mockResponse?.value.headers.set).toHaveBeenCalledWith("Content-Range", "services 1-2/20");

      expect(res.status).toBe(200);
      expect(data).toEqual(mockItems);
    });

    it("should use default pagination if no query params provided", async () => {
      const mockItems = [{ id: 1, title: "Default Story" }];

      (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
      (countAll as jest.Mock).mockResolvedValue(5);

      const req = new Request("http://localhost/api/success_stories");
      const res = await GET(req);
      const data = await res.json();

      expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 10 });
      expect(data).toEqual(mockItems);
    });
  });

  // --------------------------
  // POST Tests
  // --------------------------
  describe("POST", () => {
    it("should return 400 if no image is provided", async () => {
      const req = new Request("http://localhost/api/success_stories", {
        method: "POST",
        body: JSON.stringify({
          title: "Missing Image",
          summary: "Summary",
          description: "Description",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("No image uploaded");
    });

    it("should upload image and create record successfully", async () => {
      uploadMock.mockImplementation((_opts, callback) => ({
        end: (_buf?: any) =>
          callback(null, { secure_url: "https://cloudinary.com/test.jpg" }),
      }));

      (createData as jest.Mock).mockResolvedValue({ id: 1, title: "Story Created" });

      const req = new Request("http://localhost/api/success_stories", {
        method: "POST",
        body: JSON.stringify({
          title: "Story Created",
          image: { src: "data:image/png;base64,aGVsbG8=" },
          summary: "Summary",
          description: "Description",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({
        id: 1,
        title: "Story Created",
      });

      expect(createData).toHaveBeenCalledWith({
        title: "Story Created",
        image: "https://cloudinary.com/test.jpg",
        summary: "Summary",
        description: "Description",
        slug: "story created",
      });

      expect(isUploadApiResponse).toHaveBeenCalled();
      expect(slugify).toHaveBeenCalledWith("Story Created", { lower: true });
    });

    it("should return 500 if Cloudinary response is invalid", async () => {
      uploadMock.mockImplementation((_opts, callback) => ({
        end: (_buf?: any) => callback(null, { secure_url: "invalid" }),
      }));

      (isUploadApiResponse as unknown as jest.Mock).mockReturnValue(false);

      const req = new Request("http://localhost/api/success_stories", {
        method: "POST",
        body: JSON.stringify({
          title: "Bad Upload",
          image: { src: "data:image/png;base64,aGVsbG8=" },
          summary: "Summary",
          description: "Description",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Invalid upload response");
    });
  });
});
