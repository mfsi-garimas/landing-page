/**
 * @jest-environment node
 */

import { GET, DELETE, PUT } from "@/app/(landing)/api/insights/[id]/route";
import { NextResponse } from "next/server";

// --- Mock dependencies ---
import { getById, deleteData, updateData } from "@/lib/data/insights";
import cloudinary from "@/lib/cloudinary";
import generateRandomId from "@/lib/generate_random";
import isUploadApiResponse from "@/lib/cloudinary_api_response";
import slugify from "slugify";

jest.mock("@/lib/data/insights", () => ({
  getById: jest.fn(),
  deleteData: jest.fn(),
  updateData: jest.fn(),
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

describe("API /api/insights/[id]", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------
  // GET Tests
  // --------------------------
  describe("GET", () => {
    it("should return a record when found", async () => {
      const mockRecord = { id: 1, title: "Insight 1" };
      (getById as jest.Mock).mockResolvedValue(mockRecord);

      const context = { params: Promise.resolve({ id: "1" }) };
      const req = new Request("http://localhost/api/insights/1");

      const res = await GET(req, context);
      const data = await res.json();

      expect(getById).toHaveBeenCalledWith(1);
      expect(data).toEqual(mockRecord);
      expect(res.status).toBe(200);
    });

    it("should return 404 if record not found", async () => {
      (getById as jest.Mock).mockResolvedValue(null);

      const context = { params: Promise.resolve({ id: "99" }) };
      const req = new Request("http://localhost/api/insights/99");

      const res = await GET(req, context);
      const data = await res.json();

      expect(data).toEqual({ error: "Not Found" });
    });
  });

  // --------------------------
  // DELETE Tests
  // --------------------------
  describe("DELETE", () => {
    it("should return success true when deletion succeeds", async () => {
      (deleteData as jest.Mock).mockResolvedValue(true);

      const context = { params: Promise.resolve({ id: "2" }) };
      const req = new Request("http://localhost/api/insights/2", { method: "DELETE" });

      const res = await DELETE(req, context);
      const data = await res.json();

      expect(deleteData).toHaveBeenCalledWith(2);
      expect(data).toEqual({ success: true });
      expect(res.status).toBe(200);
    });

    it("should return 500 when deletion fails", async () => {
      (deleteData as jest.Mock).mockResolvedValue(false);

      const context = { params: Promise.resolve({ id: "2" }) };
      const req = new Request("http://localhost/api/insights/2", { method: "DELETE" });

      const res = await DELETE(req, context);
      const data = await res.json();

      expect(data).toEqual({ success: false, error: "Failed to remove record" });
      expect(res.status).toBe(500);
    });
  });

  // --------------------------
  // PUT Tests
  // --------------------------
  describe("PUT", () => {
    it("should update record with new image", async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({
          end: () => callback(null, { secure_url: "https://cloudinary.com/test.jpg" }),
        })
      );
      (updateData as jest.Mock).mockResolvedValue({ id: 1, title: "Updated Insight" });

      const req = new Request("http://localhost/api/insights/1", {
        method: "PUT",
        body: JSON.stringify({
          title: "Updated Insight",
          summary: "Sum",
          description: "Desc",
          image: { src: "data:image/png;base64,aGVsbG8=" },
        }),
      });

      const context = { params: Promise.resolve({ id: "1" }) };

      const res = await PUT(req, context);
      const data = await res.json();

      expect(updateData).toHaveBeenCalledWith(
        {
          title: "Updated Insight",
          image: "https://cloudinary.com/test.jpg",
          summary: "Sum",
          description: "Desc",
          slug: "updated insight",
        },
        1
      );

      expect(data).toEqual({ id: 1, title: "Updated Insight" });
    });

    it("should update record without new image", async () => {
      (updateData as jest.Mock).mockResolvedValue({ id: 2, title: "No Image Update" });

      const req = new Request("http://localhost/api/insights/2", {
        method: "PUT",
        body: JSON.stringify({
          title: "No Image Update",
          summary: "Sum",
          description: "Desc",
        }),
      });

      const context = { params: Promise.resolve({ id: "2" }) };

      const res = await PUT(req, context);
      const data = await res.json();

      expect(updateData).toHaveBeenCalledWith(
        {
          title: "No Image Update",
          summary: "Sum",
          description: "Desc",
          slug: "no image update",
        },
        2
      );

      expect(data).toEqual({ id: 2, title: "No Image Update" });
    });

    it("should return 500 if upload response invalid", async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_opts, callback) => ({ end: () => callback(null, { secure_url: "invalid" }) })
      );
      (isUploadApiResponse as unknown as  jest.Mock).mockReturnValue(false);

      const req = new Request("http://localhost/api/insights/1", {
        method: "PUT",
        body: JSON.stringify({
          title: "Bad Upload",
          summary: "Sum",
          description: "Desc",
          image: { src: "data:image/png;base64,aGVsbG8=" },
        }),
      });

      const context = { params: Promise.resolve({ id: "1" }) };
      const res = await PUT(req, context);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Invalid upload response");
    });
  });
});
