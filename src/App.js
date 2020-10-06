import React from 'react';
import { Weather} from './components/Weather'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import {WeatherForm} from './components/WeatherForm'

//api_call api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

const API_key = "3d28fbe2b2bada940c6764e6002285c7";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      country: null,
      icon: null,
      temp: null,
      temp_min: null,
      temp_max: null,
      description: "",
      error:false,
    };
    this.weatherIconObject = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
    
  }

  getWeather = async(e)=>{
        e.preventDefault();
        const  city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        if( city && country){
          const api_call = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
          );
          const response = await api_call.json();
          this.setState({
            city: `${response.name} ${response.sys.country}`,
            temp: this.calCelsius(response.main.temp),
            temp_min: this.calCelsius(response.main.temp_min),
            temp_max: this.calCelsius(response.main.temp_max),
            description: response.weather[0].description,
            error: false,
          });
          this.weather_icon(response.weather[0].id);
        }
        else{
          this.setState({error:true})
        }
      }

  

  

  weather_icon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIconObject.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIconObject.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIconObject.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIconObject.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIconObject.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIconObject.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIconObject.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIconObject.Clouds });
    }
  };

  calCelsius = (temp) => Math.floor(temp - 279.15);

  render() {
    return (
      <div className="App">
        <WeatherForm loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          icon={this.state.icon}
          temp={this.state.temp}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
        />
      </div>
    );
  }
}
export default App;
