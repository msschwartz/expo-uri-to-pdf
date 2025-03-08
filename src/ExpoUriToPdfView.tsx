import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoUriToPdfViewProps } from './ExpoUriToPdf.types';

const NativeView: React.ComponentType<ExpoUriToPdfViewProps> =
  requireNativeView('ExpoUriToPdf');

export default function ExpoUriToPdfView(props: ExpoUriToPdfViewProps) {
  return <NativeView {...props} />;
}
