export interface ContactData {
  title: string;
  version: string;
  fields: {
    name: {
      label: string;
      hint: string;
      placeholder: string;
    };
    email: {
      label: string;
      hint: string;
      placeholder: string;
    };
    message: {
      label: string;
      hint: string;
      placeholder: string;
    };
  };
  buttons: {
    send: string;
    sending: string;
    clear: string;
  };
  status: {
    idle: string;
    sending: string;
    success: string;
    error: string;
  };
}
