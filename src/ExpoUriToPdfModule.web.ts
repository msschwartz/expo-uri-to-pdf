import { registerWebModule, NativeModule } from 'expo';

import { ExpoUriToPdfModuleEvents } from './ExpoUriToPdf.types';

class ExpoUriToPdfModule extends NativeModule<ExpoUriToPdfModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoUriToPdfModule);
