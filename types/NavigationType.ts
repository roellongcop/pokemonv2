import {NavigationHelpers, ParamListBase} from "@react-navigation/native";

export type NavigationType = NavigationHelpers<ParamListBase, any> & {
  navigate: (arg0: string, arg1?: any) => void;
  addListener: (arg0: string, arg1: (e: any) => void) => void;
  getState: () => any;
  goBack: (key: number) => void;
  setOptions: (arg0: {
    headerShown?: boolean,
    headerTitle?: string,
    headerRight?: () => JSX.Element,
    header?: () => JSX.Element,
  }) => void;
};