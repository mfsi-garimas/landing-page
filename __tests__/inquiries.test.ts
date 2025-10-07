/**
 * @jest-environment node
 */

import { GET } from "@/app/(landing)/api/inquiries/route";
import { NextResponse } from "next/server";
import { getAllByFilter, countAll } from "@/lib/data/contact";

// --- Mock dependencies ---
jest.mock("@/lib/data/contact", () => ({
  getAllByFilter: jest.fn(),
  countAll: jest.fn(),
}));

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

describe("API /api/contact", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return contacts with correct pagination and headers", async () => {
    const mockItems = [
      { id: 1, name: "John Doe", message: "Hello" },
      { id: 2, name: "Jane Smith", message: "Hi" },
    ];

    (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
    (countAll as jest.Mock).mockResolvedValue(20);

    const req = new Request("http://localhost/api/contact?_page=1&_limit=2");

    const res = await GET(req);
    const data = await res.json();

    expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 2 });
    expect(countAll).toHaveBeenCalled();

    expect(NextResponse.json).toHaveBeenCalledWith(mockItems);

    // Check Content-Range header
    const headers = (NextResponse.json as jest.Mock).mock.results[0].value.headers;
    expect(headers.set).toHaveBeenCalledWith("Content-Range", "services 1-2/20");

    expect(res.status).toBe(200);
    expect(data).toEqual(mockItems);
  });

  it("should use default pagination if no query params provided", async () => {
    const mockItems = [{ id: 3, name: "Default User" }];

    (getAllByFilter as jest.Mock).mockResolvedValue(mockItems);
    (countAll as jest.Mock).mockResolvedValue(5);

    const req = new Request("http://localhost/api/contact");

    const res = await GET(req);
    const data = await res.json();

    expect(getAllByFilter).toHaveBeenCalledWith({ skip: 0, take: 10 });
    expect(data).toEqual(mockItems);
  });
});
