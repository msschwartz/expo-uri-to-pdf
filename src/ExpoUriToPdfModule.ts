import { NativeModule, requireNativeModule } from 'expo';

import { ExpoUriToPdfModuleEvents } from './ExpoUriToPdf.types';

declare class ExpoUriToPdfModule extends NativeModule<ExpoUriToPdfModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoUriToPdfModule>('ExpoUriToPdf');
