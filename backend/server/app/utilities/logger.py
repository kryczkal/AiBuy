import logging

log_file_path = "../logs.log"


def log_init(level_threshold, filepath, name):
    logging.basicConfig(
        filename=filepath,
        level=level_threshold,
        format='%(levelname)s: %(asctime)s - %(message)s')
    return logging.getLogger(name)


def clean_log(log_filepath):
    with open(log_filepath, 'w'):
        pass


if __name__ == '__main__':
    clean_log(log_file_path)
    logger = log_init(logging.DEBUG, log_file_path, __name__)

    logger.debug('debug test')
    logger.info('info test')
    logger.warning('warning test')
    logger.error('error test')
    logger.critical('critical test')
