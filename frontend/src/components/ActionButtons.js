import {
  Modal,
  Button,
  Spinner,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  BsArchive,
  BsBoxArrowUp,
  BsBlockquoteRight,
  BsPlus,
  BsFiles,
} from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrAddSummary } from "../actions/summary";
import {
  getArchives,
  saveToArchive,
  chooseArchive,
  deleteArticle,
} from "../actions/archives";
import Picker from "./Picker";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {Link} from 'react-router-dom';




export const ArcButton = (props) => {
  const [ArcModalShow, setArcModalShow] = useState(false);
  const dispatch = useDispatch();
  const url = props.url;
  const title = props.title;
  const domain = props.domain;
  
  function ArcModal(props) {
    const auth = useSelector((state) => state.auth);
    const url = props.url;

    function Options(props) {
      const archives = useSelector((state) => state.archives.archives);
      const chosen = useSelector((state) => state.archives.chosen);
      const options = archives.map((archive) => ({
        value: archive.id,
        label: archive.emoji.concat(" ").concat(archive.title),
      }));
      const url = props.url;
      const title = props.title;
      const domain = props.domain;
      const hide = props.hide;

      const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
      });
      const onSubmit = (data) => {
        //const dat = JSON.stringify(data)
        dispatch(saveToArchive(data));
        dispatch(chooseArchive(null));
        hide();
      };

      const registerOptions = {
        archive: { required: "Archive is required" },
      };

      return (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto py-3 px-md-3"
          style={{ maxWidth: "35rem" }}
        >
          <Form.Group>
            <Form.Label>Archive:</Form.Label>
            <Picker options={options} />
            <input
              type="hidden"
              name="archive"
              value={chosen ? chosen.value : null}
              ref={register(registerOptions.archive)}
            />
            <input
              type="hidden"
              name="url"
              value={url}
              ref={register({ required: true })}
            />
            <input
              type="hidden"
              name="title"
              value={title}
              ref={register({ required: true })}
            />
            <input
              type="hidden"
              name="domain"
              value={domain}
              ref={register({ required: true })}
            />
            <small>{errors.archive && errors.archive.message}</small>
          </Form.Group>

          <Form.Group className="pt-2">
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              ref={register()}
              name="notes"
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Save
          </Button>
        </Form>
      );
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onEnter={() => dispatch(getArchives())}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            🎒 Archive
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{ auth.isAuthenticated ? 
          <Options
            title={title}
            domain={domain}
            url={url}
            hide={props.onHide}
          /> : <> <Link to="login">Login </Link>to save archives.</>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="none-outline" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <button className="btn btn-none" onClick={() => setArcModalShow(true)}>
        <BsArchive />
      </button>
      <ArcModal
        url={url}
        show={ArcModalShow}
        onHide={() => {
          setArcModalShow(false);
        }}
      />{" "}
    </>
  );
};

export const SumButton = (props) => {
  const [SumModalShow, setSumModalShow] = useState(false);
  const dispatch = useDispatch();

  function SumModal(props) {
    const url = props.url;
    const summary = useSelector((state) => state.sum.summary);

    let newText = summary ? (
      summary.summary.split("\n").map((i) => {
        return (
          <p key={i} className="px-md-3">
            {i}
          </p>
        );
      })
    ) : (
      <div className="row justify-content-center p-3">
        <h6 className="px-2" style={{ display: "inline" }}>
          Summarizing{" "}
        </h6>{" "}
        <Spinner animation="grow" size="sm" />
      </div>
    );
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onEnter={() => dispatch(getOrAddSummary({ url }))}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            🔖 Summary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="py-3 px-md-3">{props.title}</h4>
          <div className="row justify-content-center">
            <small>
              {" "}
              {summary ? <p>Reduced by: {summary.reduced_by}</p> : null}
            </small>{" "}
          </div>
          {newText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="none" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <button className="btn btn-none" onClick={() => setSumModalShow(true)}>
        <BsBlockquoteRight />
      </button>
      <SumModal
        url={props.url}
        title={props.title}
        show={SumModalShow}
        onHide={() => setSumModalShow(false)}
      />
    </>
  );
};

export const ShareButton = ({ link }) => {
  const [tooltip, SetTooltip] = useState(true);
  const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(obj[p]);
      }
    return str;
  };
  const handleClick = () => {
    SetTooltip(true);
    navigator.clipboard.writeText(serialize({ link }));
    setTimeout(() => {
      SetTooltip(false);
    }, 1000);
  };

  return (
    <>
      <OverlayTrigger
        rootClose
        rootCloseEvent="mousedown"
        trigger="click"
        placement="bottom"
        overlay={
          tooltip ? (
            <Tooltip id={`tooltip-top`}>🔗 Copied to clipboard!</Tooltip>
          ) : (
            <span></span>
          )
        }
      >
        <button className="btn btn-none" onClick={handleClick}>
          <BsBoxArrowUp />
        </button>
      </OverlayTrigger>
    </>
  );
};

export const AddArticle = (props) => {
  const [ArtModalShow, setArtModalShow] = useState(false);

  function ArtModal(props) {
    function URLForm(props) {
      const dispatch = props.dispatch;
      const hide = props.hide;
      console.log(props.archive);
      const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
      });
      const onSubmit = (data) => {
        //const dat = JSON.stringify(data)
        dispatch(saveToArchive(data));
        hide();
        setTimeout(() => {
          dispatch(getArchives());
        }, 500);
      };

      const registerOptions = {
        url: { required: "URL is required" },
      };

      return (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto py-3 px-md-3"
          style={{ maxWidth: "35rem" }}
        >
          <Form.Group>
            <Form.Label>Article URL:</Form.Label>
            <Form.Control
              ref={register(registerOptions.url)}
              name="url"
              type="url"
            />
            <input
              type="hidden"
              name="archive"
              value={props.archive}
              ref={register({ required: true })}
            />
            <small>{errors.url && errors.url.message}</small>
          </Form.Group>
          <p>
            Note: Not all articles may be properly parsed, depending on if the
            publisher follows date tagging conventions or not.
          </p>

          <Button variant="primary" className="w-100" type="submit">
            Add
          </Button>
        </Form>
      );
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            📇 Add Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <URLForm
            archive={props.archive}
            dispatch={props.dispatch}
            hide={props.onHide}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="none" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <button
        className="btn btn-none p-0"
        onClick={() => setArtModalShow(true)}
      >
        <BsPlus />
      </button>
      <ArtModal
        archive={props.archive}
        dispatch={props.dispatch}
        show={ArtModalShow}
        onHide={() => setArtModalShow(false)}
      />
    </>
  );
};

export const FilesButton = (props) => {
  const [FilesModalShow, setFilesModalShow] = useState(false);
  const dispatch = useDispatch();

  function FilesModal(props) {
    function CheckForm(props) {
      const hide = props.hide;
      const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
      });
      const onSubmit = (data) => {
        //const dat = JSON.stringify(data)
        dispatch(deleteArticle(data.article_id));
        hide();
        setTimeout(() => {
          dispatch(getArchives());
        }, 500);
      };

      const registerOptions = {
        article_id: { required: "Article is required" },
      };

      const [value, setValue] = useState("");
      const handleChange = (newValue) => {
        setValue(newValue.value);
      };
      return (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto py-3 px-md-3"
          style={{ maxWidth: "35rem" }}
        >
          <Form.Group>
            <Form.Label>Select Article:</Form.Label>

            <Select
              onChange={handleChange}
              options={props.articles.map((article) => ({
                value: article.id,
                label: (
                  <span>
                    {article.title} - {article.domain}
                  </span>
                ),
              }))}
            />

            <input
              type="hidden"
              name="article_id"
              value={value}
              ref={register(registerOptions.article_id)}
            />
            <small>{errors.article_id && errors.article_id.message}</small>
          </Form.Group>

          <Button variant="danger" className="w-100" type="submit">
            Delete
          </Button>
        </Form>
      );
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            🗃 Manage Articles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckForm
            articles={props.articles}
            hide={props.onHide}
            archive={props.archive}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="none" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <button className="btn btn-none" onClick={() => setFilesModalShow(true)}>
        <BsFiles />
      </button>
      <FilesModal
        show={FilesModalShow}
        onHide={() => setFilesModalShow(false)}
        articles={props.articles}
      />
    </>
  );
};
