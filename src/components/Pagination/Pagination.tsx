import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pages: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [curPage, setCurPage] = useState(currentPage);

  useEffect(() => {
    setCurPage(1);
    onPageChange(currentPage);
  }, [perPage]);

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: curPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={curPage === 1}
            onClick={() => {
              setCurPage(curPage - 1);
              onPageChange(curPage - 1);
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => (
          <li
            key={i + 1}
            className={`page-item${curPage === i + 1 ? ' active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => {
                setCurPage(i + 1);
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: curPage === Math.ceil(total / perPage),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={curPage === Math.ceil(total / perPage)}
            onClick={() => {
              setCurPage(curPage + 1);
              onPageChange(curPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: perPage }, (_, i) => {
          const index = (curPage - 1) * perPage + i;

          if (index >= total) {
            return;
          }

          return (
            <li data-cy="item" key={index}>
              Item {index + 1}
            </li>
          );
        })}
      </ul>
    </>
  );
};
