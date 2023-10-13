import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ImageUploadModal from './../../components/modal/insertImage';
import "./images.scss";

const Images = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                        onChange={date => setStartDate(date)}
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
                        onChange={date => setEndDate(date)}
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
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>
                
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>

                <div className="card">
                    <img src="https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80" alt="" />
                </div>
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