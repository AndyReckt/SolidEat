import React from "react";

interface ReservationModalProps {
    onClose: () => void;
    onSubmit?: (reservationInfo: ReservationInfo) => void;
}

interface ReservationInfo {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ onClose, onSubmit }) => {
    const [reservationInfo, setReservationInfo] = React.useState<ReservationInfo>({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: 1
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(reservationInfo);
        }

        onClose();
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === 'guests' ? Math.max(1, parseInt(value) || 1) : value;
        setReservationInfo(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
            <div className="absolute inset-0 bg-gray-500 opacity-75 blur-lg"></div>
            <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Réservez une table</h3>
                    </div>

                    {/*Formulaire de réservation */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                            <input type="text" id="name" name="name" value={reservationInfo.name} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md bg-red-300" required />

                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={reservationInfo.email} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md bg-red-300" required />

                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" name="date" value={reservationInfo.date} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md bg-red-300" required />

                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
                            <input type="time" id="time" name="time" value={reservationInfo.time} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md bg-red-300" required />

                            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Nombre d'invités</label>
                            <input type="number" id="guests" name="guests" value={reservationInfo.guests} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md bg-red-300" required />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white">Réserver</button>
                            <button onClick={onClose} type="button" className="btn btn-secondary bg-red-500 hover:bg-red-700 text-white ml-3">Fermer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReservationModal;
