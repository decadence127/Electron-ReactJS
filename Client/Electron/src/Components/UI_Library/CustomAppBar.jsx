import React from 'react';
import classes from './CustomAppBar.module.css'
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CropSquare from '@mui/icons-material/CropSquare';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ElectronWindowsApi from '../../ElectronComponents/renderer_sided/ElectronWindowsApi';

const CustomAppBar = () => {
  const windowApi = new ElectronWindowsApi();
  return (
    <nav>
      <div className={classes.titleshown}>Customs</div>
      <div className={classes.buttons}>
        <div id="minimize" onClick={e => { windowApi.minimize() }} className={classes.minimize}><span><MinimizeIcon fontSize="small" /></span></div>
        <div id="maximize" onClick={e => { windowApi.isMaximized ? windowApi.unmaximize() : windowApi.maximize() }} className={classes.maximize}><span><CropSquare fontSize="small" /></span></div>
        <div id="quit" onClick={e => { windowApi.destroy() }} className={classes.quit}><span><CloseIcon fontSize="small" /></span></div>
      </div>
    </nav>
  );
};

export default CustomAppBar;