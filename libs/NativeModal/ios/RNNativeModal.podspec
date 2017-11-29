
Pod::Spec.new do |s|
  s.name         = "RNNativeModal"
  s.version      = "1.0.0"
  s.summary      = "RNNativeModal"
  s.description  = <<-DESC
                  RNNativeModal
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNNativeModal.git", :tag => "master" }
  s.source_files  = "RNNativeModal/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  