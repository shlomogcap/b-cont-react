export const PROJECT_TYPE_QUERY = 'projectType';
export const PROJECT_ID_QUERY = 'projectId';
export const CONTRACT_ID_QUERY = 'contractId';
export const VENDOR_ID_QUERY = 'vendorId';

export enum Routes {
  Projects = '/app/projects',
  Vendors = '/app/vendors',
  Settings = '/app/settings',
  Project = `/app/projects/[${PROJECT_TYPE_QUERY}]/[${PROJECT_ID_QUERY}]`,
  Vendor = `/app/vendors/[${VENDOR_ID_QUERY}]`,
  Contract = `/app/projects/[${PROJECT_TYPE_QUERY}]/[${PROJECT_ID_QUERY}]/contracts/[${CONTRACT_ID_QUERY}]`,
}
