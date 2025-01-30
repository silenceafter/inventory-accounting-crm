import React, { useEffect, useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { 
    AppBar,
    Autocomplete, 
    Box, 
    CircularProgress, 
    Grid,
    Link,
    ListItem, 
    ListItemText,
    TextField,
    Toolbar
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
/*import { fetchData, setSearch, setPage, selectSearch, selectLimit, selectPage } from '../store/slices/headerSlice';
import { setDrawing } from '../store/slices/drawingsSlice';
import { fetchData as drawingsAllTreeFetchData, setItems } from '../store/slices/drawingsAllTreeSlice';
import { fetchData as drawingsTreeFetchData, setItems as setdrawingsTreeItems } from '../store/slices/drawingsTreeSlice';*/
import { debounce } from 'lodash';

function HeaderSearch(props) {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const { key, ...restProps } = props;

  //TextField
  const [inputValue, setInputValue] = useState('');
  
  //запросы
  /*const userDataRequest = useSelector((state) => state.getRequest.userDataRequest);
  const search = useSelector(selectSearch);
  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);

  //запросы для прокрутки списка
  const { items, loading, error, hasMore } = useSelector((state) => state.header);
  const listRef = useRef(null);*/

  /*const debouncedFetchData = debounce(() => {
    dispatch(fetchData({ search: inputValue, limit, page: 1 }));
  }, 1); //задержка в 500 мс

  useEffect(() => {
    //загрузка данных при пустом поисковом запросе
    if (!search) {
      dispatch(fetchData({ search: '', limit, page: 1 }));
    }
  }, [dispatch, search, limit, page]);

  useEffect(() => {
    //поиск при изменении значения в поле ввода
    if (inputValue !== search) {
      dispatch(setSearch(inputValue));
      debouncedFetchData();
    }
  }, [inputValue, search, debouncedFetchData, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);//чистим обработчик при размонтировании
  }, [loading, hasMore]);

  const handleScroll = (event) => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && !hasMore) {
        dispatch(setPage(page + 1));
        dispatch(fetchData({ search, limit, page: page + 1 }));
      }
    }
  };*/
  //
  return (
    <>
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0, paddingBottom: '0.5rem' }}>
        <Toolbar>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              
            </Grid>        
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );

}

export { HeaderSearch };