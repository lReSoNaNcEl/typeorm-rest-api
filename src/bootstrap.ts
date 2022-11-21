import {urlencodedParser, jsonParser} from './plugins/body-parser'
import morgan from "./plugins/morgan"
import expressFileUpload from './plugins/express-fileupload'
import cors from "./plugins/cors"

export default (App): void => {
    App.use(urlencodedParser)
    App.use(jsonParser)
    App.use(morgan)
    App.use(expressFileUpload)
    App.use(cors)
}
