export interface Card
{
    id: number;
    pregunta: string;
    respuesta: string;
    imagen?: string;
    match: boolean;
}
