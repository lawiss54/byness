import { Subscript } from "lucide-react";

interface YalidineSettings {
  storeName: string;
}

interface YalidineProps {
  settings: YalidineSettings;
  handleInputChange: (field: keyof YalidineSettings, value: string) => void;
}

export default function Yalidine({ settings, handleInputChange }: YalidineProps) {

    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Subscript className="w-5 h-5" />
            <span>Yalidine integration</span>
          </h2>
        </div>
        <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Api secrit key
              </label>
              <input
                type="text"
                value={settings?.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
        </div>
      </div>

    );
}