class ElectronWindowsApi {
  constructor() {
    this.isMaximized = false;
  }

  minimize() {
    window.api.request("toMain", "minimize");
    window.api.response("fromMain", (message) => {
      console.log(message);
    });
  }
  maximize() {
    window.api.request("toMain", "maximize");
    this.isMaximized = true;
    window.api.response("fromMain", (message) => {
      console.log(message);
    });
  }
  unmaximize() {
    window.api.request("toMain", "unmaximize");
    this.isMaximized = false;
  }
  destroy() {
    window.api.request("toMain", "destroy");
  }
}

export default ElectronWindowsApi;
