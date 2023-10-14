import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { loadImages } from '../../services/api';
import ImageUploadModal from './../../components/modal/insertImage';
import "./images.scss";

const Images = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [images, setImages] = useState<any[]>([]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            loadData();
        }
    };

    const handleStartDate = (date: Date | null) => {
        setStartDate(date);
        loadData();
    }

    const handleEndDate = (date: Date | null) => {
        setEndDate(date);
        loadData();
    }

    const loadData = async () => {
        console.log(currentPage);
        console.log(startDate);
        console.log(endDate);
        const response = await loadImages(currentPage, startDate, endDate);

        setTotalPage(response.totalPages);
        setImages(response.data);
    }

    useEffect(() => {
        loadData();
    }, [currentPage, startDate, endDate])
    

    return (
        <div className="container">

            <div className="create-modal">
                <div className="button" onClick={() => setModalIsOpen(true)}>
                    Insert image
                </div>

                <ImageUploadModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
            </div>

            <div className="filters">
                <div className='groupFilter'>
                    <label htmlFor="">Date from</label>
                    <DatePicker
                        selected={startDate}
                        onChange={date => handleStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Hora"
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="date-picker"
                    />
                </div>

                <div className='groupFilter'>
                    <label htmlFor="">Date to</label>
                    <DatePicker
                        selected={endDate}
                        onChange={date => handleEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Hora"
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="date-picker"
                    />
                </div>


            </div>

            <div className="cards">
                {images.map((item, index) => {
                    return (
                        <div className="card" key={index}>
                            <img src={item.path} alt="" />
        
                            <div className='owner'>
                                Cristian Berrio
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FaAngleLeft />
                </button>
                <span>
                    {currentPage} OF {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};
  
export default Images;