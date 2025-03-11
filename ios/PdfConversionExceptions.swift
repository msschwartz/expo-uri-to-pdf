import ExpoModulesCore
import Foundation

internal class ConversionRunningException: Exception {
  override var reason: String {
    "Conversion task already running"
  }
}

internal class InvalidSourceException: Exception {
  override var reason: String {
    "Invalid URI"
  }
}

internal class WebViewException: GenericException<String?> {
  override var reason: String {
    "Error occurred while converting to PDF: '\(param ?? "unknown error")'"
  }
}

internal class PdfSavingException: Exception {
  override var reason: String {
    "Error occurred while saving the PDF"
  }
}

internal class NoDataException: Exception {
  override var reason: String {
    "No data returned from conversion"
  }
}
