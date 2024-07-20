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


clean_log(log_file_path)
global_loger = log_init(logging.DEBUG, log_file_path, __name__)

if __name__ == '__main__':
    global_loger.debug('debug test')
    global_loger.info('info test')
    global_loger.warning('warning test')
    global_loger.error('error test')
    global_loger.critical('critical test')
