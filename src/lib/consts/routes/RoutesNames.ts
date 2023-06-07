import {
  CONTRACT_ID_QUERY,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
  VENDOR_ID_QUERY,
} from './queryParams';

export enum IRoutesNames {
  App = '/app',
  Projects = `/app/projects`,
  ProjectsWithType = `/app/projects/[${PROJECT_TYPE_QUERY}]`,
  Vendors = '/app/vendors',
  Settings = '/app/settings',
  Project = `/app/projects/[${PROJECT_TYPE_QUERY}]/[${PROJECT_ID_QUERY}]`,
  Vendor = `/app/vendors/[${VENDOR_ID_QUERY}]`,
  Contract = `/app/projects/[${PROJECT_TYPE_QUERY}]/[${PROJECT_ID_QUERY}]/contracts/[${CONTRACT_ID_QUERY}]`,
  Me = '/app/settings/me',
  Company = '/app/settings/company',
  Budget = '/app/settings/budgetChapters',
}
