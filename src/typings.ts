export interface IDog {
  width: TDogImageSizeParameter;
  height: TDogImageSizeParameter;
  image: string;
  format: DogImageFormat;
}

export type TDogImageSizeParameter = number | null;

export enum DogImageFormat {
  Jpg = 'jpg',
  Png = 'png',
  Gif = 'gif',
  Jpeg = 'jpeg'
}
