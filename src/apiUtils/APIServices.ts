import { get, post, put, del, patch } from "apiUtils/api";

class APIServices {
  url: string;
  name?: string;
  data: any = [];
  success: boolean = false;

  constructor(url: string, name?: string) {
    this.url = url;
    this.name = name;
  }
  getURL(id: any) {
    return Boolean(id) ? `/${this.url}/${id}` : `/${this.url}`;
  }

  async get() {
    await get({ url: this.url })
      .then((response: any) => {
        if (response.data.status < 300) {
          this.data = response.data.response;
          this.success = true;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(e => {});
    return { data: this.data, success: this.success };
  }

  async post(formData: any) {
    await post({ url: this.url, data: formData })
      .then((response: any) => {
        if (response.status < 300) {
          this.data = response.data;
          this.success = true;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(e => {});
    return { data: this.data, success: this.success };
  }

  async put(id: number, formData: any) {
    await put({ url: this.getURL(id), data: formData })
      .then((response: any) => {
        if (response.status < 300) {
          this.data = response.data;
          this.success = true;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(e => {});
    return { data: this.data, success: this.success };
  }

  async patch(id: any, formData: any) {
    await patch({ url: this.getURL(id), data: formData })
      .then((response: any) => {
        if (response.status < 300) {
          this.success = true;
          this.data = response.data;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(e => {});
    return { data: this.data, success: this.success };
  }

  async delete(id: number) {
    await del(this.getURL(id))
      .then((response: any) => {
        if (response.status < 300) {
          this.success = true;
          this.data = response.data;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(e => {});
    return { data: this.data, success: this.success };
  }
}

export default APIServices;
