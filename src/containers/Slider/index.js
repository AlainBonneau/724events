import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = (data?.focus ?? [])
    .slice()
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1));

  useEffect(() => {
    if (!byDateDesc.length) return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % byDateDesc.length);
    }, 5000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [byDateDesc.length, index]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id ?? `${event.title}-${event.date}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination une seule fois */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((e, radioIdx) => (
            <input
              key={e.id ?? `${e.title}-${e.date}-radio`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
