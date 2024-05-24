import { PORT } from "@/config/app";

import { appServerIntance } from "./app";

appServerIntance.listen(PORT, () => {
  console.log("Server is running");
});
