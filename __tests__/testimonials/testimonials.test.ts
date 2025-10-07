/**
 * @jest-environment node
 */

import { GET, POST } from "@/app/(landing)/api/testimonials/route";
import { NextResponse } from "next/server";
import {
  getAllByFilter,
  countAll,
  createData,
} from "@/lib/data/testimonials";
import cloudinary from "@/lib/cloudinary";
import generateRandomId from "@/lib/generate_random";
import isUploadApiResponse from "@/lib/cloudinary_api_response";

// ---------------- MOCKS ----------------
jest.mock("@/lib/data/testimonials", () => ({
  getAllByFilter: jest.fn(),
  countAll: jest.fn(),
  createData: jest.fn(),
}));

jest.mock("@/lib/cloudinary", () => ({
  uploader: { upload_stream: jest.fn() },
}));

jest.mock("@/lib/generate_random", () => jest.fn());
jest.mock("@/lib/cloudinary_api_response", () => jest.fn());
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status ?? 200,
      json: async () => data,
      headers: { set: jest.fn() },
    })),
  },
}));

describe("API /api/testimonials", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------- GET ----------
  it("should return testimonials with correct pagination and headers", async () => {
    const mockItems = [
      { id: 1, name: "Alice", message: "Great service" },
      { id: 2, name: "Bob", message: "Excellent experience" },
    ];

    (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
    (countAll as jest.Mock).mockResolvedValue(20);

    const req = new Request("http://localhost/api/testimonials?_page=1&_limit=2");
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

  it("should use default pagination if no query params provided", async () => {
    const mockItems = [{ id: 3, name: "Default User" }];

    (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
    (countAll as jest.Mock).mockResolvedValue(5);

    const req = new Request("http://localhost/api/testimonials");
    const res = await GET(req);
    const data = await res.json();

    expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 10 });
    expect(data).toEqual(mockItems);
  });

  // ---------- POST ----------
  it("should create a new testimonial successfully", async () => {
    const mockUploadResult = { secure_url: "http://cloudinary.com/test.jpg" };
    const mockData = { id: 1, name: "Alice" };

    (generateRandomId as jest.Mock).mockReturnValue("random123");
    (isUploadApiResponse as unknown as jest.Mock).mockReturnValue(true);
    (createData as jest.Mock).mockResolvedValue(mockData);

    const mockUploadStream = jest.fn((_opts, callback) => {
      callback(null, mockUploadResult);
      return { end: jest.fn() };
    });
    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(mockUploadStream);

    const reqBody = {
      name: "Alice",
      company: "Acme Inc.",
      message: "Awesome product!",
      image: { src: "data:image/png;base64,abc123" },
    };
    const req = new Request("http://localhost/api/testimonials", {
      method: "POST",
      body: JSON.stringify(reqBody),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(cloudinary.uploader.upload_stream).toHaveBeenCalled();
    expect(isUploadApiResponse).toHaveBeenCalledWith(mockUploadResult);
    expect(createData).toHaveBeenCalledWith({
      name: "Alice",
      clientLogo: "http://cloudinary.com/test.jpg",
      company: "Acme Inc.",
      message: "Awesome product!",
    });

    expect(res.status).toBe(200);
    expect(data).toEqual({ id: 1, name: "Alice" });
  });

  it("should return 400 if no image is provided", async () => {
    const req = new Request("http://localhost/api/testimonials", {
      method: "POST",
      body: JSON.stringify({ name: "Alice" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "No image uploaded" },
      { status: 400 }
    );
    expect(res.status).toBe(400);
    expect(data).toEqual({ error: "No image uploaded" });
  });

  it("should return 500 if upload response is invalid", async () => {
    (isUploadApiResponse as unknown as jest.Mock).mockReturnValue(false);

    const mockUploadStream = jest.fn((_opts, callback) => {
      callback(null, {});
      return { end: jest.fn() };
    });
    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(mockUploadStream);

    const reqBody = {
      name: "Bob",
      company: "Beta Ltd",
      message: "Nice experience!",
      image: { src: "data:image/png;base64,abc123" },
    };
    const req = new Request("http://localhost/api/testimonials", {
      method: "POST",
      body: JSON.stringify(reqBody),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ success: false, error: "Invalid upload response" });
  });
});
