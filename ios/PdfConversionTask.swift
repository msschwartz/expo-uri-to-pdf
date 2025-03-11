import ExpoModulesCore
import WebKit

class PdfConversionTask: NSObject, WKNavigationDelegate {
  let pageSize = CGSize(width: 612, height: 792)
  let printableRect = CGRect(x: 36, y: 36, width: 612 - 72, height: 792 - 72)
  let paperRect = CGRect(x: 0, y: 0, width: 612, height: 792)
    
  var onError: ((Error) -> Void)?
  var onSuccess: (([String: Any]) -> Void)?
  var webView: WKWebView?
    
  init(
    uri: String,
    onError: @escaping ((Error) -> Void),
    onSuccess: @escaping (([String: Any]) -> Void)
  ) {
    super.init()
        
    self.onError = onError
    self.onSuccess = onSuccess
        
    guard let url = URL(string: uri) else {
      self.onError?(InvalidSourceException())
      return
    }
        
    let configuration = WKWebViewConfiguration()
    self.webView = WKWebView(
      frame: self.paperRect,
      configuration: configuration
    )
    self.webView?.navigationDelegate = self
    self.webView?.backgroundColor = UIColor.clear
    self.webView?.scrollView.showsHorizontalScrollIndicator = false
    self.webView?.scrollView.showsVerticalScrollIndicator = false
    self.webView?.load(URLRequest(url: url))
  }
    
  public func webView(
    _ webView: WKWebView,
    didFinish navigation: WKNavigation
  ) {
    webView
      .evaluateJavaScript(
"document.body.scrollHeight",
 completionHandler: {
 _,
 error in
        if let error = error {
          self.onError?(error)
          return
        }
            
        let renderer = UIPrintPageRenderer()
            
        renderer
          .addPrintFormatter(webView.viewPrintFormatter(), startingAtPageAt: 0)
            
        renderer.setValue(self.paperRect, forKey: "paperRect")
            
        renderer.setValue(self.printableRect, forKey: "printableRect")

        let data = NSMutableData()
            
   UIGraphicsBeginPDFContextToData(data, CGRect.zero, nil)
            
   renderer
     .prepare(
      forDrawingPages: NSRange(location: 0, length: renderer.numberOfPages)
     )
            
   if renderer.numberOfPages > 0 {
     for i in 0...renderer.numberOfPages - 1 {
       UIGraphicsBeginPDFPageWithInfo(self.paperRect, nil)
       renderer.drawPage(at: i, in: UIGraphicsGetPDFContextBounds())
     }
   }
            
   UIGraphicsEndPDFContext()
            
   if data.isEmpty {
     self.onError?(NoDataException())
     return
   }
            
   let destination = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(
    UUID().uuidString + ".pdf"
   )
            
   do {
     try data.write(to: destination)
   } catch {
     self.onError?(PdfSavingException())
     return
   }
            
   self.onSuccess?([
    "uri": destination.absoluteString,
   ])
 })
  }

  public func webView(
    _ webView: WKWebView,
    didFail navigation: WKNavigation,
    withError error: Error
  ) {
    self.onError?(WebViewException(error.localizedDescription))
  }
}
