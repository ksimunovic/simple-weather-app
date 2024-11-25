# My Weather Application

A React-based weather application that fetches and displays weather data based on user search input.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v5.6 or higher)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Weather API key as follows:
     ```plaintext
     REACT_APP_YOUR_WEATHER_API_KEY=your_api_key_here
     ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

### Features

- Search for city weather.
- Display recent searches with temperature.
- Automatically update weather data for recent searches.

### Built With

- React
- Axios
- CSS for styling
- React Select for search input

### License

This project is licensed under the MIT License. See the LICENSE file for details.