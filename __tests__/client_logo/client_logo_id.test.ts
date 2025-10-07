/**
 * @jest-environment node
 */

import { GET, DELETE } from "@/app/(landing)/api/client_logo/[id]/route";
import { getById, deleteData } from "@/lib/data/client_logo";

// Mock the dependencies
jest.mock("@/lib/data/client_logo", () => ({
  getById: jest.fn(),
  deleteData: jest.fn(),
}));

// Mock NextResponse.json to return a predictable object
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status ?? 200,
      json: async () => data,
    })),
  },
}));

describe("API /api/client_logo/[id]", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------
  // GET Tests
  // --------------------------
  describe("GET", () => {
    it("should return record when found", async () => {
      const mockRecord = { id: 1, name: "Logo 1" };
      (getById as jest.Mock).mockResolvedValue(mockRecord);

      const context = { params: Promise.resolve({ id: "1" }) };
      const req = new Request("http://localhost/api/client_logo/1");

      const res = await GET(req, context);
      const data = await res.json();

      expect(getById).toHaveBeenCalledWith(1);
      expect(data).toEqual(mockRecord);
      expect(res.status).toBe(200);
    });

    it("should return 404 when record not found", async () => {
      (getById as jest.Mock).mockResolvedValue(null);

      const context = { params: Promise.resolve({ id: "99" }) };
      const req = new Request("http://localhost/api/client_logo/99");

      const res = await GET(req, context);
      const data = await res.json();

      expect(getById).toHaveBeenCalledWith(99);
      expect(data).toEqual({ error: "Not Found" });
      expect(res.status).toBe(404);
    });
  });

  // --------------------------
  // DELETE Tests
  // --------------------------
  describe("DELETE", () => {
    it("should return success true when deleteData returns true", async () => {
      (deleteData as jest.Mock).mockResolvedValue(true);

      const context = { params: Promise.resolve({ id: "5" }) };
      const req = new Request("http://localhost/api/client_logo/5", { method: "DELETE" });

      const res = await DELETE(req, context);
      const data = await res.json();

      expect(deleteData).toHaveBeenCalledWith(5);
      expect(data).toEqual({ success: true });
      expect(res.status).toBe(200);
    });

    it("should return 500 when deleteData fails", async () => {
      (deleteData as jest.Mock).mockResolvedValue(false);

      const context = { params: Promise.resolve({ id: "10" }) };
      const req = new Request("http://localhost/api/client_logo/10", { method: "DELETE" });

      const res = await DELETE(req, context);
      const data = await res.json();

      expect(deleteData).toHaveBeenCalledWith(10);
      expect(data).toEqual({ success: false, error: "Failed to remove record" });
      expect(res.status).toBe(500);
    });
  });
});
