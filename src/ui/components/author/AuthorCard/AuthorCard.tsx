import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Author } from '../../../../api/types/author.ts';
import { useNavigate } from "react-router-dom";

interface AuthorCardProps {
    author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardContent>
                <Typography variant='h5'>{author.name} {author.surname}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                {/*<Button startIcon={<InfoIcon/>}>Info</Button>*/}
                <Button
                    startIcon={<InfoIcon/>}
                    onClick={() => navigate(`/authors/${author.id}`)}
                    color='secondary'
                >
                    Info
                </Button>

                <Box>
                    <Button startIcon={<EditIcon/>} color='warning'>Edit</Button>
                    <Button startIcon={<DeleteIcon/>} color='error'>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default AuthorCard;