import ExpoModulesCore

public class ExpoUriToPdfModule: Module {
  var conversionTask: PdfConversionTask?

  public func definition() -> ModuleDefinition {
    Name("ExpoUriToPdf")

    Events("onChange")

    AsyncFunction("uriToPdf") { (uri: String, promise: Promise) in
      if self.conversionTask != nil {
        promise.reject(ConversionRunningException())
        return
      }
      self.conversionTask = PdfConversionTask(
        uri: uri,
        onError: { error in
          promise.reject(error)
          self.conversionTask = nil
        },
        onSuccess: { result in
          promise.resolve(result)
          self.conversionTask = nil
        }
      )
    }.runOnQueue(.main)

    View(ExpoPdfView.self) {
      Prop("uri") { (view: ExpoPdfView, uri: URL) in
        if view.webView.url != uri {
          view.webView.load(URLRequest(url: uri))
        }
      }

      Events("onLoad")
    }
  }
}
