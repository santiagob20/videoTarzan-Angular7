export interface Movie{
    id?:Number;
    titulo?:string;
    descripcion?:string;
    url_imagen?: string;
    lista_actores?:Array<string>;
    director?:string;
    costo_alquiler?:Number;
    stock?:Number;

}