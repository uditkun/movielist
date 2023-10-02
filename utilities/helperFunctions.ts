export const BASEIMG_URL = "https://image.tmdb.org/t/p/";
export const BACKDROPIMG_URL = "https://image.tmdb.org/t/p/w1280";

type Sizes = {
  [key: string]: string;
};

export const getImgURL = (imageSrc: string, size = "2x") => {
  const sizes: Sizes = {
    "0x": "original",
    "1x": "w92",
    "2x": "w154",
    "3x": "w185",
    "4x": "w342",
    "5x": "w500",
    "7x": "w780",
  };

  return BASEIMG_URL + sizes[size] + String(imageSrc);
};

export const routeLink = (inputString: string) => {
  //this function removes whitespaces/special characters and adds dashes in between
  //its just a convention for the routing
  const words = inputString
    ?.replace(/[^\w\s]/g, "")
    ?.toLowerCase()
    ?.trim()
    ?.split(/\s+/);
  const stringWithDashes = words?.join("-");
  return stringWithDashes;
};

export const formatMovieMin = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${formattedHours} hr ${formattedMinutes} mins`;
};

export const debounce = (func: Function, delay: number = 400) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
