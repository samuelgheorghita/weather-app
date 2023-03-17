import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import { v4 } from "uuid";
import "./forecast.css";
import ForecastDetails from "../forecast-details/forecast-details";

function Forecast({ data }) {
  const { list } = data;
  const itemsArray = [];
  const detailsArray = [];
  const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const indexNextDay = list.findIndex((elem) => elem.dt_txt.includes("00:00:00"));
  const myData = [];

  const today = new Date().getDay() + 1;
  const daysFromToday = DAYS_OF_WEEK.slice(today, DAYS_OF_WEEK.length).concat(DAYS_OF_WEEK.slice(0, today));

  // MAIN LOGIC FUNCTION!!!
  function preparingData() {
    let currObj = {};
    const regex = new RegExp("09|[1-5][0-9]");
    let minArr = [];
    let maxArr = [];

    for (let i = 0; i < 40; i++) {
      const objIcon = list[i].weather[0].icon;
      const description = list[i].weather[0].description;
      // Checking if a new day started
      if ((i + indexNextDay) % 8 === 0) {
        if (indexNextDay === 0) {
          myData.push({ ...currObj });
        } else {
          myData.push({ ...currObj });
          currObj = {};
          myData[(i + indexNextDay) / 8 - 1].min = Math.min(...minArr);
          myData[(i + indexNextDay) / 8 - 1].max = Math.max(...maxArr);
          minArr = [];
          maxArr = [];
        }
      }

      // **** Setting ICON, this does not cover the 1st day. It could remain undefined the value of the first icon
      // **** Here i'm setting also the description, to match the icon
      if (regex.test(objIcon)) {
        currObj.icon = objIcon;
        currObj.description = description;
      }
      // If no icon is set(if no precipitation), then set it to the icon at time 12:00, index 4 of the data list
      // Also setting the description, in order to match the icon
      // next line i'm setting some kind of default value
      // TODO: Improve the icons shown

      if (!currObj.icon && (i + indexNextDay + 4) % 8 === 0) {
        currObj.icon = objIcon;
        currObj.description = description;
      }

      // Preparing arrays in order to set min and max temperatures
      minArr.push(list[i].main.temp_min);
      maxArr.push(list[i].main.temp_max);
    }

    // **** Setting the day of the week
    for (let i = 0; i < 5; i++) {
      myData[i].dayWeek = daysFromToday[i];
    }
  }
  preparingData();

  const toChangeName = myData.map((header, index) => {
    let miniList = list.slice(indexNextDay + 8 * (index - 1), indexNextDay + 8 * index);
    if (index === 0) {
      miniList = list.slice(0, indexNextDay);
    }
    return (
      <AccordionItem key={v4()}>
        <AccordionItemHeading>
          <AccordionItemButton>
            <div className="daily-item">
              <div className="img-div grid-elem">
                <img src={`icons/${header.icon}.png`} alt="weather-img" />
              </div>
              <div className="day-of-week grid-elem">{header.dayWeek}</div>
              <div className="desc grid-elem">{header.description}</div>
              <div className="min-max grid-elem">
                {Math.floor(header.min)}/{Math.floor(header.max)}
              </div>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ForecastDetails miniList={miniList} />
        </AccordionItemPanel>
      </AccordionItem>
    );
  });

  return (
    <div className="forecast">
      <Accordion allowZeroExpanded>{toChangeName}</Accordion>
    </div>
  );
}

export default Forecast;
