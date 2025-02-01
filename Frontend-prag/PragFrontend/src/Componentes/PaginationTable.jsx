import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
const PaginationTable = ({
  pagesCountServer
  , currentPage
  , setCurrentPage
  , alwaysShown = true
  , setPagination
}) => {
  const pagesCount = pagesCountServer;
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 0;
  const isCurrentPageLast = currentPage === pagesCount - 1;
  const changePage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
    setPagination(values => ({
      ...values
      , pageIndex: number
    }));
  };
 
  const onPageNumberClick = pageNumber => {
    changePage(pageNumber - 1);
  };
 
  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };
 
  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };
 
  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
      setPagination(values => ({
        ...values
        , pageIndex: pagesCount
      }));
    }
  };
 
  let isPageNumberOutOfRange;
 
  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;
    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
 
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage + 1}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }
 
    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }
 
    return null;
  });
 
  useEffect(setLastPageAsCurrent, [pagesCount]);
 
  return (
    <>
      {isPaginationShown && (
        <Container>
          <Row>
            <Col className="d-flex justify-content-center align-items-center gap-3 mt-3">
              <span className="fs-6 text-pewter-blue">Mostrando {currentPage + 1}  de {pagesCount}</span>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center gap-3 mt-2">
              <Pagination>
                <Pagination.Prev
                  onClick={onPreviousPageClick}
                  disabled={isCurrentPageFirst}
                />
                {pageNumbers}
                <Pagination.Next
                  onClick={onNextPageClick}
                  disabled={isCurrentPageLast}
                />
              </Pagination>
            </Col>
          </Row>
        </Container>
 
      )
      }
    </>
  );
};
 
PaginationTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool
};
 
export default PaginationTable;