export default function ValidationError({ message }: { message: string }) {
    return <p className="text-red-500 text-sm">{message}</p>;
}