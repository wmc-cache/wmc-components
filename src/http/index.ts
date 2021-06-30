import { AxiosRequestConfig } from "./types"
import xhr from "./xhr"
function http(config: AxiosRequestConfig): void {
  xhr(config)

}

export default http



