class ElectronWindowsApi {
  constructor() {
    this.isMaximized = false;
  }

  minimize() {
    window.api.request("toMain", "minimize");
    console.log(this.isMaximized);
    window.api.response("fromMain", (e, message) => {
      console.log(message);
    });
  }
  maximize() {
    window.api.request("toMain", "maximize");
    this.isMaximized = true;
    window.api.response("fromMain", (e, message) => {
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
