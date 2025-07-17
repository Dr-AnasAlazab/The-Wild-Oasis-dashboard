import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

// v2
// // Right now this is not really reusable... But we will want to use a similar table for guests as well, but with different columns. ALSO, right now we are defining these columns in BOTH the TableHeader and the CabinRow, which is not good at all. Instead, it would be much better to simply pass the columns into the Table, and the table would give access to the columns to both the header and row. So how can we do that? Well we can again use a compound component! We don't HAVE to do it like this, there's a million ways to implement a table, also without CSS Grid, but this is what I chose
// const Table = styled.div`
//   border: 1px solid var (--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource={'cabins'} />;

  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount === 0
    );
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount > 0
    );

  const sortBy =
    searchParams.get('sortBy') || 'starDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortCabins =
    field === 'name'
      ? filteredCabins.sort(
          (a, b) => a.name.localeCompare(b.name) * modifier
        )
      : filteredCabins?.sort(
          (a, b) => (a[field] - b[field]) * modifier
        );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
