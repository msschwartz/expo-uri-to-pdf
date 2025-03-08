import * as React from 'react';

import { ExpoUriToPdfViewProps } from './ExpoUriToPdf.types';

export default function ExpoUriToPdfView(props: ExpoUriToPdfViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
