import { notification } from "antd";
import { createContext } from "react";

const initialValues = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showSuccessNotification: (_message: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showErrorNotification: (_message: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showInfoNotification: (_message: string) => {},
};

export const AlertContext = createContext(initialValues);

export const AlertProvider = ({ children }: any) => {
  const [api, contextHolder] = notification.useNotification();

  const value = {
    showSuccessNotification: (description: string) => {
      api.success({
        message: "Success",
        description,
        placement: "topRight",
        duration: 3,
      });
    },
    showErrorNotification: (description: string) => {
      api.error({
        message: "Error",
        description,
        placement: "topRight",
        duration: 3,
      });
    },
    showInfoNotification: (description: string) => {
      api.info({
        message: "Infomation",
        description,
        placement: "topRight",
        duration: 3,
      });
    },
  };

  return (
    <AlertContext.Provider value={value}>
      {contextHolder}
      {children}
    </AlertContext.Provider>
  );
};
