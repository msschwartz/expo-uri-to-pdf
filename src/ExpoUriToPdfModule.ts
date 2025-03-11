import { NativeModule, requireNativeModule } from "expo";

import { ExpoUriToPdfModuleEvents } from "./ExpoUriToPdf.types";

declare class ExpoUriToPdfModule extends NativeModule<ExpoUriToPdfModuleEvents> {
  uriToPdf(uri: string): Promise<{ uri: string }>;
}

export default requireNativeModule<ExpoUriToPdfModule>("ExpoUriToPdf");
