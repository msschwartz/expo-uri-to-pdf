import { requireNativeView } from "expo";
import * as React from "react";

import { ExpoPdfViewProps } from "./ExpoUriToPdf.types";

const NativeView: React.ComponentType<ExpoPdfViewProps> = requireNativeView("ExpoUriToPdf");

export default function ExpoPdfView(props: ExpoPdfViewProps) {
  return <NativeView {...props} />;
}
