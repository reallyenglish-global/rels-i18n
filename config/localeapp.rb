Localeapp.configure do |config|
  config.api_key = ENV['LOCALEAPP_API_KEY']
  config.translation_data_directory = File.join(__dir__, '../.tmp/localeapp/')
  config.synchronization_data_file  = File.join(__dir__, '../.localeapp/log.yml')
end
