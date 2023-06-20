import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';

export const prepareWorkspaceOptions = (workspaces: IWorkspaceDoc[]) => {
  const result: IDropdownOption<string>[] = [];
  const wsMap = new Map(workspaces.map((ws) => [ws.path, ws]));
  const contactPath = (ws: IWorkspaceDoc): string => {
    if (ws.parent) {
      const parent = wsMap.get(String(ws?.parent));
      if (parent) {
        return `${contactPath(parent)} / ${ws.title}`;
      }
    }
    return ws.title;
  };
  workspaces.forEach((ws) => {
    result.push({ value: ws.path!, text: contactPath(ws) });
  });
  return result;
};
