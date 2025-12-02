import '../test/mocks'
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DashboardService, * as api from "../services/dashboard.service";
import "@testing-library/jest-dom";
import type { News } from "~/interfaces/Dashboard";
import Dashboard from "./Dashboard";
import { renderWithProviders, mockApiSuccess } from '../test/helpers'

vi.mock("../services/dashboard.service");

let newsIdCounter = 1

  export function createMockNews(overrides?: Partial<News>): News {
  return {
    id: String(newsIdCounter++),
    title: 'Test News Title',
    publishedAt: '2024-11-20',
    content: 'Test news content',
    ...overrides
  }
}

export function createMockHouse(overrides?: Partial<any>) {
  return {
    id: 1,
    name: 'Test House',
    address: 'Test Street 1',
    ...overrides
  }
}


describe("Dashboard komponens", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("DataScroller komponens megjelenik-e a híreket megkapva", async () => {
    const mockNews = [
      createMockNews(),
      createMockNews({ title: 'Közgyűlés' })
    ]
    
    vi.mocked(DashboardService.getDashboardData).mockResolvedValue(
        mockApiSuccess({
        selectedBuilding: {
          announcements: mockNews,
          parkingData: [],
          maintenanceRequest: [],
          document: [],
          events: [],
          finances: 0,
          maintenancesCount: 0,
          expenseTotal: 0,
          chartData: null,
          financeReports: null
        }
      })
    );

    const selectedHouse = createMockHouse()

    renderWithProviders(
        <Dashboard selectedHouse={selectedHouse} houses={[]} />
    );

    await waitFor(() => {
      //expect(screen.debug());
      expect(screen.getByText('Test News Title'));
     expect(screen.getByText('Közgyűlés')).toBeInTheDocument();
    });

   expect(DashboardService.getDashboardData).toHaveBeenCalledWith(1, "current");
   expect(DashboardService.getDashboardData).toHaveBeenCalledTimes(1);
  });
});