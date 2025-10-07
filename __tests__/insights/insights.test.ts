/**
 * @jest-environment node
 */

import { GET, POST } from "@/app/(landing)/api/insights/route";
import { NextResponse } from "next/server";

// --- Mock dependencies ---
import { getAllByFilter, countAll, createData } from "@/lib/data/insights";
import cloudinary from "@/lib/cloudinary";
import generateRandomId from "@/lib/generate_random";
import isUploadApiResponse from "@/lib/cloudinary_api_response";
import slugify from "slugify";

jest.mock("@/lib/data/insights", () => ({
  getAllByFilter: jest.fn(),
  countAll: jest.fn(),
  createData: jest.fn(),
}));

jest.mock("@/lib/cloudinary", () => ({
  uploader: {
    upload_stream: jest.fn(),
  },
}));

jest.mock("@/lib/generate_random", () => jest.fn(() => "random123"));
jest.mock("@/lib/cloudinary_api_response", () => jest.fn(() => true));
jest.mock("slugify", () => jest.fn((str: string) => str.toLowerCase()));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status ?? 200,
      json: async () => data,
      headers: {
        set: jest.fn(),
      },
    })),
  },
}));

describe("API /api/insights", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------
  // GET Tests
  // --------------------------
  describe("GET", () => {
    it("should return paginated insights with headers", async () => {
      const mockItems = [
        { id: 1, title: "Insight 1" },
        { id: 2, title: "Insight 2" },
      ];

      (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
      (countAll as jest.Mock).mockResolvedValue(20);

      const req = new Request("http://localhost/api/insights?_page=1&_limit=2");

      const res = await GET(req);
      const data = await res.json();

      expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 2 });
      expect(countAll).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(mockItems);

      const headers = (NextResponse.json as jest.Mock).mock.results[0].value.headers;
      expect(headers.set).toHaveBeenCalledWith("Content-Range", "services 1-2/20");

      expect(res.status).toBe(200);
      expect(data).toEqual(mockItems);
    });
  });

  // --------------------------
  // POST Tests
  // --------------------------
  describe("POST", () => {
    it("should return 400 if no image is provided", async () => {
      const req = new Request("http://localhost/api/insights", {
        method: "POST",
        body: JSON.stringify({ title: "Test Insight", summary: "Sum", description: "Desc" }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("No image uploaded");
    });

    it("should upload image and create record successfully", async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({
          end: () => callback(null, { secure_url: "https://cloudinary.com/test.jpg" }),
        })
      );

      (createData as jest.Mock).mockResolvedValue({ id: 1, title: "Test Insight" });

      const req = new Request("http://localhost/api/insights", {
        method: "POST",
        body: JSON.stringify({
          title: "Test Insight",
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
        title: "Test Insight",
        summary: "Summary",
        description: "Description",
        image: {
          src: "https://cloudinary.com/test.jpg",
          title: "random123",
        },
      });

      expect(createData).toHaveBeenCalledWith({
        title: "Test Insight",
        image: "https://cloudinary.com/test.jpg",
        summary: "Summary",
        description: "Description",
        slug: "test insight",
      });

      expect(isUploadApiResponse).toHaveBeenCalled();
      expect(slugify).toHaveBeenCalledWith("Test Insight", { lower: true });
    });

    it("should return 500 if Cloudinary response is invalid", async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({
          end: () => callback(null, { secure_url: "invalid" }),
        })
      );

      (isUploadApiResponse as unknown as jest.Mock).mockReturnValue(false);

      const req = new Request("http://localhost/api/insights", {
        method: "POST",
        body: JSON.stringify({
          title: "Bad Upload",
          image: { src: "data:image/png;base64,aGVsbG8=" },
          summary: "Sum",
          description: "Desc",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Invalid upload response");
    });
  });
});
