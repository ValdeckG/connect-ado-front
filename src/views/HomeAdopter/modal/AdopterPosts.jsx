import {
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Card,
  AspectRatio,
  IconButton,
  ModalOverflow,
  Button,
  CircularProgress,
  Box,
} from "@mui/joy";
import { Heart, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";
import { CreatePostModal } from "./CreatePostModal";

export function AdopterPostsModal({ open, setOpen }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/posts/timeline");
      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esta postagem?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${postId}`);

      fetchPosts();

      alert("Postagem foi deletada.");
    } catch (error) {
      console.error("Erro ao deletar postagem:", error);
    }
  };

  useEffect(() => {
    if (open) {
      (async () => {
        await fetchPosts();
      })();
    }
  }, [open, fetchPosts]);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalOverflow>
          <ModalDialog
            minWidth={450}
            maxWidth={800}
            sx={{ borderRadius: "md", p: 3, my: 4, width: "100%" }}
          >
            <ModalClose />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
              sx={{ mb: 1, pr: 4 }}
            >
              <Box>
                <Typography level="h3" component="h2">
                  Mural de Postagens
                </Typography>
                <Typography level="body-sm">
                  Histórico de atividades, rotinas e momentos compartilhados.
                </Typography>
              </Box>

              <Button
                variant="solid"
                color="primary"
                className="btn-submit"
                size="sm"
                onClick={() => setOpenCreateModal(true)}
              >
                <Plus size={18} style={{ marginRight: "6px" }} />
                Nova Postagem
              </Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress size="lg" />
              </Box>
            ) : (
              <Stack spacing={3}>
                {posts.length === 0 ? (
                  <Typography
                    level="body-md"
                    sx={{ textAlign: "center", color: "neutral.500", py: 4 }}
                  >
                    Nenhuma postagem encontrada.
                  </Typography>
                ) : (
                  posts.map((post) => (
                    <Card key={post.id} variant="outlined" sx={{ p: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: 1 }}
                      >
                        <Typography level="title-lg">{post.title}</Typography>
                        <Typography
                          level="body-xs"
                          sx={{ color: "neutral.500", pt: 0.5 }}
                        >
                          {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                        </Typography>
                      </Stack>

                      {post.photo_url && (
                        <AspectRatio
                          ratio="16/9"
                          sx={{
                            borderRadius: "md",
                            mb: 2,
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={post.photo_url}
                            loading="lazy"
                            alt={post.title}
                            style={{ objectFit: "cover", display: "block" }}
                          />
                        </AspectRatio>
                      )}

                      <Typography
                        level="body-md"
                        sx={{ mb: 2, whiteSpace: "pre-line" }}
                      >
                        {post.content}
                      </Typography>
                      <Divider />

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ mt: 1 }}
                      >
                        <IconButton variant="plain" color="danger" size="sm">
                          <Heart
                            size={30}
                            fill={post.isLiked ? "currentColor" : "none"}
                          />
                        </IconButton>

                        <IconButton
                          variant="plain"
                          color="neutral"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          sx={{ "&:hover": { color: "danger.main" } }}
                        >
                          <Trash2 size={30} />
                        </IconButton>
                      </Stack>
                    </Card>
                  ))
                )}
              </Stack>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>

      <CreatePostModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        onPostCreated={fetchPosts}
      />
    </>
  );
}
