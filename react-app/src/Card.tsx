import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImgComponent from "./ImgComponent";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import './Card.css';



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface productProps {
  prod: {
    name: string,
    price: number,
    img: string,
    describe: string,
    imgArr: string[],
    model: string,
    color: string[],
    size: string[]
  }
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function RecipeReviewCard(props: productProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [showModel, setShowModel] = React.useState(true);
  const handleShoeModel = (p: boolean) => {
    setShowModel(p);

  }
  const [showColor, setShowColor] = React.useState(true);
  const handleShoeColor = (p: boolean) => {
    setShowColor(p);

  }
  const [showSize, setShowSize] = React.useState(true);
  const handleShoeSize = (p: boolean) => {
    setShowSize(p);

  }
  function addToBag() {
    alert("added");
    smallShopingBag();
    update();


  }
  function update() {

  }
  function smallShopingBag() {
  }

  return (
    <div id="card">

    <Card sx={{ maxWidth: 300 }}>
    
      <h1></h1>
      <CardHeader
        action={
          <IconButton aria-label="add to shoping bag">
            <AddShoppingCartSharpIcon onClick={addToBag} />
          </IconButton>

        }
        title={props.prod.name}
        subheader={props.prod.describe}
      />
      <ImgComponent

      imgIt={{
        it: props.prod.img
      }}
      />
      <CardActions disableSpacing>
        <Typography paragraph>
          <h5>מחיר: {props.prod.price}</h5>
          {showModel && <h5>דגם: {props.prod.model}</h5>}
          {showColor && <h5>צבע:

            <select>
              {props.prod.color.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </h5>
          }
  

          {showSize && <h5>size: {props.prod.size.map((item, index)=>(
             <label>
             <input 
               type="radio" 
               value={item} 
               name="size"              
             />
             {item}
           </label>
          ))}</h5>}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
          <Typography paragraph>
            <h5> {props.prod.imgArr.map((item) => {
              return (
              
                <img src={item}/>          
              )
            })}</h5>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
